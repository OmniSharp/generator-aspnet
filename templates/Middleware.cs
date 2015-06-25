using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Http;

namespace <%= namespace %>
{
    // You may need to install the Microsoft.AspNet.Http.Abstractions package into your project
    public class <%= classname %>
    {
        private readonly RequestDelegate _next;

        public <%= classname %>(RequestDelegate next)
        {
            _next = next;
        }

        public Task Invoke(HttpContext httpContext)
        {

            return _next(httpContext);
        }
    }

    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class <%= classname %>Extensions
    {
        public static IApplicationBuilder UseMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<<%= classname %>>();
        }
    }
}
