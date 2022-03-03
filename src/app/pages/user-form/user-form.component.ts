import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MASKS, NgBrazilValidators } from 'ng-brazil';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  public masks = MASKS;
  public userForm: FormGroup;
  public userID: string | null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.userForm = this.formGroup;
    this.userID = this.getUserID();
    this.setReceivedData();
  }

  public ngOnInit(): void {
    if (this.userID && !this.userForm.get('nome')?.value) {
      this.getUser();
    }
  }

  private setReceivedData(): void {
    const passedData = this.router.getCurrentNavigation()?.extras.state;
    if (passedData) {
      this.userForm.patchValue(passedData);
    }
  }

  private getUserID(): string | null {
    return this.route.snapshot.paramMap.get('id');
  }

  private get formGroup() {
    return this.fb.group({
      nome: [null, [Validators.required]],
      sobrenome: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      cpf: [null, [Validators.required, NgBrazilValidators.cpf]],
      nascimento: [null, [Validators.required]],
      cidade: [null, [Validators.required]],
      estado: [null, [Validators.required]],
      cep: [null, [Validators.required, NgBrazilValidators.cep]]
    });
  }

  public createUser(): void {
    this.userService.create(this.userForm.value)
      .subscribe(() => {
        this.toastr.success(`Usuário ${this.userForm.get('nome')!.value} criado com sucesso.`);
        this.router.navigate(['../']);
      });
  }

  public deleteUser(): void {
    this.userService.delete(this.userID as string)
      .subscribe(() => {
        this.toastr.success(`Usuário ${this.userForm.get('nome')!.value} deletado com sucesso.`);
        this.router.navigate(['../']);
      });
  }

  public updateUser(): void {
    this.userService.update(this.userID as string, this.userForm.value)
      .subscribe(() => {
        this.toastr.success(`Usuário ${this.userForm.get('nome')!.value} atualizado com sucesso.`);
        this.getUser();
      });
  }

  public getUser(): void {
    this.userService.get(this.userID as string)
      .subscribe((user) => this.userForm.patchValue(user));
  }

}
