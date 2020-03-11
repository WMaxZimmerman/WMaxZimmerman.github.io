using NTrospection.CLI.Core;

namespace WMaxZimmerman.Site.Console
{
   class Program
   {
       static void Main(string[] args)
       {
           new Processor().ProcessArguments(args);
       }
   }
}
