import { ZodError, type ZodType, z } from 'zod';

export abstract class AbstractDto<Schema extends ZodType> {
    protected data!: z.infer<Schema>;

    constructor (data: Record<string, unknown>) {
        this.validate(data);
    }

    protected abstract rules(): Schema;

    public getAll(): z.infer<Schema> {
        return this.data;
    }

    public get<K extends keyof z.infer<Schema>>(key: K) {
        return this.data[key];
    }

    private validate(data: Record<string, unknown>){
        try {
            this.data = this.rules().parse(data);   
        } catch (error) {
            if (error instanceof ZodError) {
                const issues = error.issues.map((issue) => {
                    const pointer = '#/' + issue.path.join('/');

                    return {
                        details: issue.message,
                        pointer,
                    }
                })
                const newError: any = error;
                newError.issues = issues;

                throw newError;
            }

            throw new Error('Internal error');            
        }
    }

}