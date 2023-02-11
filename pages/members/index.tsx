import { withAuthSync } from "libs/auth";

import qs from "qs";
import { Table, Breadcrumb, Spinner, Badge } from "react-bootstrap";
import Link from "next/link";
import Layout from "components/Layout";
import Pagination from "components/Pagination";
import Router, { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { getAuth } from "firebase/auth";

// const shallowRouterPush = (paginationQuery: PartnerPaginationQuery) => {
//     const queryString = qs.stringify(paginationQuery, {
//         arrayFormat: "repeat",
//     });
//     Router.push(`/partners?${queryString}`, undefined, { shallow: true });
// };

const PartnerListPage = () => {
    const limit: number = 20;
    const router = useRouter();
    const routerPage: number = Number(router.query.page) || 1;
    // const parsedPartnerQuery: PartnerQuery = parsePartnerQuery(router.query);
    // const paginationQuery: PartnerPaginationQuery = {
    //     page: routerPage - 1,
    //     limit,
    //     ...parsedPartnerQuery,
    // };

    getAuth()
        .getUsers([
            { uid: "uid1" },
            { email: "user2@example.com" },
            { phoneNumber: "+155555020" },
            { providerId: "google.com", providerUid: "google_uid4" },
        ])
        .then((getUsersResult) => {
            console.log(`Successfully fetched user data: `);
            getUsersResult.users.forEach((userRecord) => {
                console.log(userRecord);
            });
            console.log(
                `Unable to find users corresponding to these identifiers:`
            );
            getUsersResult.notFound.forEach((userIdentifier) => {
                console.log(userIdentifier);
            });
        })
        .catch((error) => {
            console.log(`Error fetching user data: `, error);
        });

    // const { data } = useSWR(
    //     `/partners?${qs.stringify(paginationQuery, { arrayFormat: "repeat" })}`,
    //     fetcher
    // );

    // const onUpdateQuery = (query: PartnerQuery) => {
    //     const paginationQuery: PartnerPaginationQuery = {
    //         page: routerPage,
    //         limit,
    //         ...query,
    //     };
    //     shallowRouterPush(paginationQuery);
    // };

    // const onUpdatePage = (page: number) => {
    //     const paginationQuery: PartnerPaginationQuery = {
    //         page: page,
    //         limit,
    //         ...parsedPartnerQuery,
    //     };
    //     shallowRouterPush(paginationQuery);
    // };

    return (
        <Layout>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="/partners" active>
                    Partner
                </Breadcrumb.Item>
            </Breadcrumb>
            {/* <div className="text-end mb-3">
                <CreatePartnerButton />
            </div> */}
            {!data ? (
                <div className="text-center p-4">
                    <Spinner animation="border" variant="secondary" />
                </div>
            ) : (
                <>
                    <Pagination
                        page={routerPage}
                        total={data.total}
                        limit={limit}
                        onChangePage={onUpdatePage}
                    />
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr className="align-middle">
                                <th>#</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Score</th>
                                <th>Tier</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.partners?.map((partner) => (
                                <tr key={partner.id} className="align-middle">
                                    <td>
                                        <Link href={`/partners/${partner.id}`}>
                                            <a>{partner.id}</a>
                                        </Link>
                                    </td>
                                    <td>
                                        {partner.name}
                                        {partner.verified && (
                                            <Badge
                                                bg="primary"
                                                className="mx-1 align-middle"
                                            >
                                                Verified
                                            </Badge>
                                        )}
                                    </td>
                                    <td>{partner.phone}</td>
                                    <td>{partner.score}</td>
                                    <td>{partner.tier}</td>
                                    {/* <td>
                                        <SendRequestListButton
                                            partner_id={partner.id}
                                            className="me-1"
                                        />
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Pagination
                        page={routerPage}
                        total={data.total}
                        limit={limit}
                        onChangePage={onUpdatePage}
                    />
                </>
            )}
        </Layout>
    );
};

export default withAuthSync(PartnerListPage);
