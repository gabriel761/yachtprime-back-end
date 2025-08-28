import { MailService } from '@sendgrid/mail';
import { Form } from '../../types/Form.js';
import config from '../../config.js';
import { CustomError } from '../../infra/CustoError.js';

export class FormModel {
    private sgMail: MailService = new MailService()
    private email: string = config.formEmail
    private apiKey: string = config.sendGridApiKey

    async enviarEmail(formData: Form) {
        this.sgMail.setApiKey(this.apiKey)
        try {

            const mailData = {
                from: `${this.email}`,
                to: `${this.email}`,
                subject: `Formulário YachtPrime - formulário enviado da página de ${formData.formType}`,
                html: `
                    <h3>Formulário YachtPrime - Formulário enviado da página de ${formData.formType}</h3>
                    <ul>
                            <li>Nome: ${formData.name}</li>
                            <li>E-mail: ${formData.email}</li>
                            <li>Telefone: ${formData.phone}</li>
                            <li>Mensagem: ${formData.message}</li>
                        </ul>`
            }
            await this.sgMail.send(mailData);
        } catch (err: any) {
            console.log(err)
            if (err.response) {
                console.log(err.response.body)
                throw new CustomError("erro ao enviar formulario" + err.response.body, 500)
            }
        }
    }
}