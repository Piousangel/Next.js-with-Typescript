import { useEffect } from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';

export const login = ({ token, user }) => {
    cookie.set('token', token, { expires: 1 });
    cookie.set('user', JSON.stringify(user), { expires: 1 });
};

export const auth = (ctx) => {
    const { token, user } = nextCookie(ctx);
    if (!token) {
        const path = ctx.asPath;
        if (typeof window === 'undefined') {
            ctx.res.writeHead(302, { Location: `/login?redirect_url=${path}` });
            ctx.res.end();
        } else {
            Router.push({
                pathname: '/login',
                query: { redirect_url: path },
            });
        }
    }
    return { token, user };
};

export const logout = () => {
    cookie.remove('token');
    cookie.remove('user');
    window.localStorage.setItem('logout', Date.now());
    Router.push('/login');
};

export const withAuthSync = (WrappedComponent) => {
    const Wrapper = (props) => {
        const syncLogout = (event) => {
            if (event.key === 'logout') {
                console.log('logged out from storage!');
                Router.push('/login');
            }
        };

        useEffect(() => {
            window.addEventListener('storage', syncLogout);

            return () => {
                window.removeEventListener('storage', syncLogout);
                window.localStorage.removeItem('logout');
            };
        }, []);

        return <WrappedComponent {...props} />;
    };

    Wrapper.getInitialProps = async (ctx) => {
        const { token, user } = auth(ctx);

        const componentProps = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));

        return { ...componentProps, token, user };
    };

    return Wrapper;
};
