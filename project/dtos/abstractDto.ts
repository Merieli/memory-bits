import { type ZodType, z } from 'zod';

export abstract class AbstractDto<Schema extends ZodType> {
    protected data!: z.infer<Schema>;

    constructor (data: Record<string, unknown>) {
        this.validate(data);
    }

    protected abstract rules(): Schema;

    public getAll(): z.infer<Schema> {
        return this.data;
    }

    private validate(data: Record<string, unknown>){
        try {
            this.data = this.rules().parse(data);   
        } catch (error) {
            console.debug("🟣 ~ AbstractDto<Schema ~ validate ~ error:", error)
            
        }
    }

}