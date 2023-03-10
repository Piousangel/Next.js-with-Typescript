import Head from "next/head";

interface Props {
    title: string;
    children: React.ReactNode;
}
export const ServiceLayout = function ({
    title = "main title",
    children,
}: Props) {
    return (
        <div>
            <Head>
                <title>{title}</title>
            </Head>
            {children}
        </div>
    );
};
