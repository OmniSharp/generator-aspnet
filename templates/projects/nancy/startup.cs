namespace <%= namespace %>
{
    using Microsoft.AspNet.Builder;
    using Nancy.Owin;
 
    public class Startup
    {
        public void Configure(IApplicationBuilder app)
        {
            app.UseOwin(x => x.UseNancy());
        }
    }
}
