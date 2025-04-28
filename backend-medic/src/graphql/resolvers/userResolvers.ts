export const userResolvers= {
    Query: {
        hello:()=> 'Hello from user resolvers!'
    },
    Mutation:{
        signup: async (_:any, args:{username:string, email:string, password:string})=>{
            const { username,email,password}= args;
            return "Signup Mutation Ready!"
        },
    },
};