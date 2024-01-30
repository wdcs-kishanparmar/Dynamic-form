import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId:
        "151816684247-87ffth2ofh1l579ajsf43lbvlss558e6.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
});

export { handler as GET, handler as POST };
