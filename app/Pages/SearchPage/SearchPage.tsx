import type { Category } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";
import type { FC } from "react";
import type { ProductData } from "~/services/product.server";

type CategoryPageProps = {
  data: {
    products: ProductData;
    categories: Category[];
    page: number;
  };
};

const SearchPage: FC<SerializeFrom<CategoryPageProps>> = ({ data }) => {
  return (
    <>
      {/* <PageLayout isAdmin={false}>
        <Header>
          <StoreHeader />
        </Header>
        <div className={styles.sidebar}>
          <Sidebar links={data.categories} />
        </div>
        <main className={styles.main}>
          <div className={styles.mainWrapper}>
            <div className={styles.sort}>
              <SortTypesList />
            </div>
            <div className={styles.productsListContainer}>
              <ProductsList productsData={data.products} />
            </div>
            <div className={styles.paginationContainer}>
              <Pagination
                admin={false}
                currentPage={data.page}
                totalPages={data.products.totalPages}
              />
            </div>
          </div>
        </main>
        <div className={styles.footer}>
          <Footer />
        </div>
      </PageLayout> */}
    </>
  );
};

export default SearchPage;
