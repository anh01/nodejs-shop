package ukcodoctoruseful.format;

import java.text.MessageFormat;


public class TestMessageFormat
{

   public static void main(String[] args)
   {
      MessageFormat f = new MessageFormat("format {0} me");
      final String obj = "eggs for";
      final Object[] format = new Object[] { obj };
      System.out.println(f.format(format));
      //fails
      System.out.println(f.format(obj));
   }
}
