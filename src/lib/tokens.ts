import { randomBytes, createHash } from 'node:crypto';
import { env } from './env.js';
import { jwtVerify, SignJWT } from 'jose';
import type { Role } from '../generated/prisma/enums.js';

const accessSecret = new TextEncoder().encode(env.JWT_ACCESS_SECRET);

export type AccessClaim = {
    sub: string;
    role: Role;
    email: string;
};

export async function signAccessToken(claim: AccessClaim): Promise<string> {
    return new SignJWT({ role: claim.role, email: claim.email })
        .setProtectedHeader({ alg: 'HS256'  })
        .setSubject(claim.sub)
        .setIssuedAt()
        .setExpirationTime('15m')
        .sign(accessSecret);
}

export async function verifyAccessToken(token: string): Promise<AccessClaim> {
    const { payload } = await jwtVerify(token, accessSecret);
    return {
        sub: payload.sub as string,
        role: payload.role as Role,
        email: payload.email as string,
    };
}

export function generateRefreshToken(): string { 
    return randomBytes(32).toString('hex');
}

export function hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
}