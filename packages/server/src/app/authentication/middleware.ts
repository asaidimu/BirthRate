import { validateAuthToken } from "./services.js";

/** TODO: make this configurable **/
export const AccessControlGroup = {
    ROOT: 1,
    USERS: 2,
};

export const decodeAuthToken: Middleware = async (req, _, next) => {
    const tokenFrom = ({ header }: { header: string }): string | null => {
        if (header === undefined || String(header).length === 0) return null;
        const matches = header.match(/Bearer\s(.*)/);
        if (matches === null) return null;
        if (matches[1] === undefined) return null;
        return matches[1];
    };

    const headerToken = tokenFrom({
        header: req.get("Authorization") as string,
    });

    const cookieToken = req.cookies.auth_token || null;
    const token = cookieToken !== null ? cookieToken : headerToken;
    if (token !== null) {
        const login = await validateAuthToken({ token });
        req.login = login;
    } else {
        req.login = null
    }

    next();
};

export const allow: AccessPolicyGenerator = ({ groups, check }) => {
    const allowed = Array.isArray(groups) ? groups : [groups];
    const customPolicy = check || (() => true);

    return (req, res, next) => {
        const forbidden = () => {
            (res.status as any as Function)(403).send({ error: "Forbidden" });
        };

        const login: AuthTokenPayload | null | undefined = req.login;

        if (!login) {
            return (res.status as any as Function)(401).send({
                error: "Unauthorized",
            });
        }

        /*
         * Filter out the groups which satisfy the following conditions:
         *  a). The group in question is allowed access to the resource
         *  b). The user is a member of the said group.
         */
        const accessibleGroups = login.groups.reduce((acc, curr) => {
            if (allowed.findIndex((i) => i === curr) !== -1) {
                acc.push(curr);
            }
            return acc;
        }, [] as Array<number>);

        const isRoot = () => {
            const index = login.groups.findIndex(
                (a) => a === AccessControlGroup.ROOT,
            );
            return index !== -1;
        };

        /* If no groups in common subject is denied access */

        /*
         * allow access
         * if the user is root
         * or
         *  atleast one access group is defined
         *  and
         * the user has passed the custom check
         */

        if (
            isRoot() ||
            (accessibleGroups.length > 0 && customPolicy(login, req))
        ) {
            return next();
        }

        return forbidden();
    };
};

export const isUserId: CustomAccessPolicy = (login, req) => {
    if (req.params && req.params.uid) {
        return req.params.uid === login.id;
    }

    return false;
};

export const checkUserId = (
    groups: number | Array<number> = AccessControlGroup.USERS,
) => {
    return allow({ groups, check: isUserId });
};

/*
 * Rules:
 * - all subjects have a security id
 * - all subjects must belong to at least one group
 * - all groups have a security id
 * - all subjects have a user id
 * - a subject can belong to multiple groups
 * - only one type of access exists: execute
 * - once a group is granted access to a procedure, all members can execute it
 */
