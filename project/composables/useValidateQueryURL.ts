import { pageCardParams } from '~/schema/pageCards.schema';

export default () => {
    
    const route = useRoute();
    const router = useRouter();

    const validData: ComputedRef = computed(() => {
        try {
            pageCardParams.parse(route.params);
        } catch (e) {
            router.push({ name: 'NotFound' });
            return null;
        }
    });

    return {
        validData,
    }
}