using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Razor.TagHelpers;

namespace <%= namespace %>
{
    // You may need to install the Microsoft.AspNet.Razor.Runtime package into your project
    [HtmlTargetElement("tag-name")]
    public class <%= classname %> : TagHelper
    {
        public override void Process(TagHelperContext context, TagHelperOutput output)
        {

        }
    }
}
