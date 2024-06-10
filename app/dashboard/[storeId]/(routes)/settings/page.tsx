import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";

import { SettingForm } from "@/app/dashboard/[storeId]/(routes)/settings/_components/settings-form";

interface SettingPageProps {
    params: {
        storeId: string
    }
};

const SettingsPage: React.FC<SettingPageProps> = async ({
    params
}) => {
    const {userId} = auth();

    if(!userId) {
        redirect("/sign-in");
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    });

    if(!store) {
        redirect("/");
    }

    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 py-6">
                <SettingForm initialData={store} />
            </div>
        </div>
     );
}
 
export default SettingsPage;