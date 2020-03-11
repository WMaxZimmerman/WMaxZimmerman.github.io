using WMaxZimmerman.Site.DAL.Repositories;

namespace WMaxZimmerman.Site.ApplicationCore.Services
{
    public class ExampleService
    {
        public static string HelloWorld()
        {
            return ExampleRepository.HelloWorld();
        }
    }
}
