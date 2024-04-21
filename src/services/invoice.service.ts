import {InvoiceRepository} from "repositories";

class InvoiceService {
    protected InvoiceRepository: InvoiceRepository;

    constructor() {
        this.InvoiceRepository = new InvoiceRepository;
    }

    public async createInvoice(data: any) {
        try {
            return await this.InvoiceRepository.createInvoice(data);
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
}

export {InvoiceService};
