using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.Rendering;
using Microsoft.AspNet.Razor.Runtime.TagHelpers;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNet.Html.Abstractions;
using Microsoft.AspNet.Mvc.TagHelpers;
using Microsoft.AspNet.Mvc.ViewFeatures;
using Microsoft.AspNet.Razor.TagHelpers;
using Microsoft.Extensions.WebEncoders;

namespace <%= namespace %>.TagHelpers
{
    /// <summary>
    /// <see cref="ITagHelper"/> implementation targeting &lt;menulink&gt; elements that assist with rendering contextually aware menu links.
    /// If the current route is matched the given &lt;menulink&gt; will be active. This was added to demonstrate how a TagHelper might be used
    /// with Semantic UI to implement a simple menu.
    /// </summary>
    [HtmlTargetElement("menulink", Attributes = "controller-name, action-name, menu-text")]
    public class MenuLinkTagHelper : TagHelper
    {
        public string ControllerName { get; set; }
        public string ActionName { get; set; }
        public string MenuText { get; set; }

        [ViewContext]
        public ViewContext ViewContext { get; set; }

        public IUrlHelper _UrlHelper { get; set; }

        public MenuLinkTagHelper(IUrlHelper urlHelper)
        {
            _UrlHelper = urlHelper;
        }

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            string menuUrl = _UrlHelper.Action(ActionName, ControllerName);

            output.TagName = "";

            var a = new TagBuilder("a");

            a.MergeAttribute("href", $"{menuUrl}");
            a.MergeAttribute("class", "item");

            a.InnerHtml.Append(MenuText);

            var routeData = ViewContext.RouteData.Values;
            var currentController = routeData["controller"];
            var currentAction = routeData["action"];

            if (String.Equals(ActionName, currentAction as string, StringComparison.OrdinalIgnoreCase)
                && String.Equals(ControllerName, currentController as string, StringComparison.OrdinalIgnoreCase))
            {
                a.AddCssClass("active");
                a.AddCssClass("blue");
            }

            output.Content.SetContent(a);

        }
    }
}