import { z } from 'zod';

export default () => {
    const route = useRoute();

    const schema = z.object({
        q: z.string().optional(),
        page: z.coerce.number().optional().default(1),
    });

    const validData = computed(() => {
        try {
          return schema.parse(route.query);
        } catch (e) {
          alert('invalid query string!');
          return null;
        }
    });
}