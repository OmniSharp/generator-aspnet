using Microsoft.AspNet.Mvc;

namespace <%= namespace %>
{
    public class <%= classname %> : ViewComponent
    {
		public IViewComponentResult Invoke()
		{
			return View();
		}
    }
}
