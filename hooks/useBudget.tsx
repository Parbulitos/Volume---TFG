import { supabaseClient } from '@/database/utils';

export const useBudget = () => {
    const getBudgetInfo = async (file: File) => {
        try {
            if (!file) return;
            const tempUpload = await supabaseClient.storage
                .from('BudgetBucket')
                .upload(`/buffer/${file.name}`, file);

            const { data } = supabaseClient.storage
                .from('BudgetBucket')
                .getPublicUrl(`/buffer/${file.name}`);
            const response = await fetch(
                `/api/budget/getbudgetinfo?fileurl=${data.publicUrl}&filepath=${tempUpload.data?.path}`
            );
            return await response.json();
        } catch (e: any) {
            console.error('An error has occurred. ', e);
            return {
                message: 'Error: ' + e.message,
            };
        }
    };

    return {
        getBudgetInfo,
    };
};
