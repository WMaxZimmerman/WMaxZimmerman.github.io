using System.Collections.Generic;
using System.Linq;
using WMaxZimmerman.Site.DAL.Repositories;
using WMaxZimmerman.Site.Shared.Models;

namespace WMaxZimmerman.Site.ApplicationCore.Services
{
    public interface IResourceService
    {
        IEnumerable<Link> GetPresentationLinks();
        IEnumerable<string> GetNames();
        IEnumerable<string> GetBlogContents(string blog);
        IEnumerable<string> GetPresentationContents(string presentation);
        IEnumerable<Link> GetBlogNames();
    }
    
    public class ResourceService: IResourceService
    {
        private IResourceRepository _repository;

        public ResourceService()
        {
            _repository = new ResourceRepository();
        }
        
        public IEnumerable<Link> GetPresentationLinks()
        {
            var resources = _repository.GetResourceNames()
                .Where(r => r.Contains("WMaxZimmerman.Site.DAL.resources.articles.") == false);

            return resources.Select(r => r.Replace("WMaxZimmerman.Site.DAL.resources.articles.", "presentations/"))
                .Select(r => r.Replace(".org", ".html"))
                .Select(r => new Link
                {
                    Location = r,
                    Title = r.Replace("presentations/", "").Replace(".html", "").Replace("-", " ").Replace("_", ": ")
                }); ;
        }

        public IEnumerable<string> GetNames()
        {
            return _repository.GetResourceNames();
        }

        public IEnumerable<Link> GetBlogNames()
        {
            var blogPrefix = "WMaxZimmerman.Site.DAL.resources.blogs.";
            var resources = _repository.GetResourceNames().Where(r => r.Contains(blogPrefix));

            return resources.Select(r => r.Replace(blogPrefix, ""))
                .Select(r => new Link
                {
                    Title = r.Replace(".html", "").Replace("-", " ").Replace("_", ": "),
                    Location = r.Replace(".html", "")
                });
        }

        public IEnumerable<string> GetBlogContents(string blog)
        {
            var resourcesName = $"WMaxZimmerman.Site.DAL.resources.blogs.{blog}.html";

            return _repository.GetResourceFileLines(resourcesName);
        }

        public IEnumerable<string> GetPresentationContents(string presentation)
        {
            var resourcesName = $"WMaxZimmerman.Site.DAL.resources.presentations.{presentation}.html";

            return _repository.GetResourceFileLines(resourcesName);
        }
    }
}
