import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import { User } from "../db";

const config = {
    clientID:
        "685036649185-e7v7q807vr71gnlbjjfsvn04021usupn.apps.googleusercontent.com", // clientId 설정하기
    clientSecret: "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", // clientSecret 설정하기
    callbackURL: "/auth/google/callback",
};

async function findOrCreateUser({ name, email }) {
    const user = await User.findOne({
        email,
    });

    if (user) {
        return user;
    }

    const created = await User.create({
        name,
        email,
        password: "GOOGLE_OAUTH",
    });

    return created;
}

module.exports = new GoogleStrategy(
    config,
    async (accessToken, refreshToken, profile, done) => {
        const { email, name } = profile._json;

        try {
            const user = await findOrCreateUser({ email, name });
            done(null, {
                shortId: user.shortId,
                email: user.email,
                name: user.name,
            });
        } catch (e) {
            done(e, null);
        }
    }
);
