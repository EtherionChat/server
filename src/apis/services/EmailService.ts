import AbstractService from './AbstractService';
import { Service } from 'typedi';

@Service()
export default class EmailService extends AbstractService {
    constructor(private readonly emailService: EmailService) {
        super();
        // this.transporter = nodemailer.createTransport({
        //     host: process.env.EMAIL_HOST,
        //     ...
    }
    public async create(data: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    public async update(id: string, data: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    public async delete(id: string): Promise<any> {
        throw new Error('Method not implemented.');
    }
    public async find(filter: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    public async findOne(filter: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    public async findById(id: string): Promise<any> {
        throw new Error('Method not implemented.');
    }
    public async findByIdAndUpdate(id: string, data: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    public async findByIdAndDelete(id: string): Promise<any> {
        throw new Error('Method not implemented.');
    }
    public async findOneAndUpdate(filter: any, data: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    public async findOneAndDelete(filter: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    public async findOneAndReplace(filter: any, data: any): Promise<any> {
        throw new Error('Method not implemented.');
    }
    public async sendEmail(email: string): Promise<void> {
        await this.emailService.sendEmail(email);
    }
}
