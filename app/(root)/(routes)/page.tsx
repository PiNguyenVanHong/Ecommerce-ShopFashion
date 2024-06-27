import { Suspense } from "react";

import Container from "@/components/user/ui/container";
import Billboard from "@/components/user/billboard";
import ProductList from "@/components/user/product-list";

import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-porducts";
export const revalidate = 0;

const Homepage = async () => {
  const billboard = await getBillboard("e2b7a2b1-490c-4ab6-8906-07fa698cef25");
  const products = await getProducts({ isFeatured: true});

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Suspense fallback={<p>Loading...</p>}>
          <Billboard data={billboard} />
        </Suspense>
      </div>
      <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
        <ProductList title="Featured Products" items={products} />
      </div>
    </Container>
  );
};

export default Homepage;
