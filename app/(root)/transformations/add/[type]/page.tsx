import Header from '@/components/shared/Header'
import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes } from '@/constants'
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import {SearchParamProps} from "@/types";

const AddTransformationTypePage = async ({ params: { type } }: SearchParamProps) => {
    const { userId } = auth();
    const transformation = transformationTypes[type];

    if(!userId) redirect('/sign-in')

    const user = await getUserById(userId);
    console.log(userId, 'haha')

    return (
        <>
            <Header
                title={transformation.title}
                subtitle={transformation.subTitle}
            />

            <section className="mt-10">
                <TransformationForm
                    action="Add"
                    userId={user._id}
                    type={transformation.type as any}
                    creditBalance={user.creditBalance}
                />
            </section>
        </>
    )
}

export default AddTransformationTypePage

