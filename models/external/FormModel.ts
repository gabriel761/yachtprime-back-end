import nodemailer from 'nodemailer';
import { Form } from '../../types/Form.js';
import config from '../../config.js';
import { CustomError } from '../../infra/CustoError.js';

export class FormModel {
    private transporter: any
    private email: string = config.formEmail
    private appPass: string = config.formAppPassword


    private async generateTransporter() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: this.email,
                pass: this.appPass // colocar no .env
            }
        });
    }

    async enviarEmail(formData: Form) {
        try {
            this.generateTransporter()
            const info = await this.transporter.sendMail({
                from: `${formData.email}`, 
                to: `${this.email}`,         
                replyTo: formData.email,
                subject: `Formulário YachtPrime - formulário enviado da página de ${formData.formType}`,   
                html: `
                    <h3>Formulário YachtPrime - Formulário enviado da página de ${formData.formType}</h3>
                    <ul>
                            <li>Nome: ${formData.name}</li>
                            <li>E-mail: ${formData.email}</li>
                            <li>Telefone: ${formData.phone}</li>
                            <li>Mensagem: ${formData.message}</li>
                        </ul>`
            })
            console.log('Email enviado: ' + info.messageId);
        } catch (err: any) {
            console.log(err)
            throw new CustomError("erro ao enviar formulario" + err.message, 500)
        }
    }
}