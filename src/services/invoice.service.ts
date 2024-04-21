import {InvoiceRepository} from "repositories";

class InvoiceService {
    protected InvoiceRepository: InvoiceRepository;

    constructor() {
        this.InvoiceRepository = new InvoiceRepository;
    }

    public async createInvoice(user_id: number) {
        try {
            return await this.InvoiceRepository.createInvoice(user_id);
        } catch (error) {
            throw error
        }
    }

    public async getAllInvoices(id: number){
        try {
            return await this.InvoiceRepository.getAllInvoices(id);
        } catch (error){
            throw error
        }
    }

    public async getInvoiceById(id: number){
        try {
            return await this.InvoiceRepository.getInvoiceById(id);
        } catch (error){
            throw error
        }
    }

    public async updateInvoice(id: number, data: any, user_id: number){
        try {
            return await this.InvoiceRepository.updateInvoice(id, data, user_id);
        } catch (error){
            throw error
        }
    }
}

export {InvoiceService};
