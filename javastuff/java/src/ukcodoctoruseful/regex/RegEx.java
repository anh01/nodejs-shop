package ukcodoctoruseful.regex;

public class RegEx
{

   String _class1 = "com/shop/core/components/GeneratedCreditCardDetailsComponent.java";
   String _class2 = "com\\shop\\core\\components\\GeneratedCreditCardDetailsComponent.java";


   public RegEx(String[] args)
   {
      logMatches(_class1, "Generated");
      logMatches(_class1, "Generated.*");
      logMatches(_class1, ".*Generated.*\\.java");
      logMatches(_class2, "Generated");
      logMatches(_class2, "Generated.*");
   }

   /**
    * @param string
    *           TODO
    * @param regex
    */
   void logMatches(String string, final String regex)
   {
      System.out.println(regex + " matches? " + string.matches(regex));
   }

   public static void main(String... args)
   {
      new RegEx(args);
   }
}
