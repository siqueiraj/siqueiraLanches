import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class UsuarioFormComponent implements OnInit {
  form!: FormGroup;
  id!: number;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      tipo: ['', Validators.required],
      endereco: this.fb.group({
        rua: ['', Validators.required],
        numero: ['', Validators.required],
        bairro: ['', Validators.required],
        cidade: ['', Validators.required],
        estado: ['', Validators.required],
        cep: ['', Validators.required]
      })
    });

    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.usuarioService.findById(this.id).subscribe((usuario) => {
        this.form.patchValue(usuario);
      });
    }
  }

  submit(): void {
    if (this.form.valid) {
      if (this.id) {
        this.usuarioService.update(this.id, this.form.value).subscribe(() => {
          this.router.navigate(['/usuarios']);
        });
      } else {
        this.usuarioService.save(this.form.value).subscribe(() => {
          this.router.navigate(['/usuarios']);
        });
      }
    }
  }
}
