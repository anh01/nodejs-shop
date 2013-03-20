package ukcodoctoruseful.picker;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;


public class RandomNamePicker
{

   /**
    * @param count
    * @param split
    */
   RandomNamePicker(int count, int split)
   {
      super();
      this.split = split;
      this.count = count;
      sleepPeriods = initSleepPeriods();
      for (int i = 0; i < split * count; i++)
      {
         System.out.print('v');
      }
      System.out.println();
   }

   /**
    * @param args
    */
   public static void main(String[] args)
   {
      String selectName = new RandomNamePicker(12, 5).selectName();
      displaySelectedName(selectName);

   }

   /**
    * @param selectName
    */
   static void displaySelectedName(String selectName)
   {
      System.out.println("And the winner is:  " + selectName.toUpperCase() + "!");
   }

   private final String[] people = { "Oliver", "Bob", "Cindy", "Stuart", "Siva", "Harsh", "Stephen", "Paul", "Pete" };

   private final List<Long> sleepPeriods;

   private int split;

   private int count;

   private String selectName()
   {

      String person = null;
      for (final Long sleep : sleepPeriods)
      {
         final double d = Math.random() * people.length;
         final int index = (int) Math.floor(d); // always round down
         person = people[index];
         display(person, index);
         displayBlips(sleep);
      }
      System.out.println(); //newline after blips
      return person;
   }

   /**
    * @param sleep
    */
   void displayBlips(final Long sleep)
   {
      final long interval = sleep / split;
      for (int i = 0; i < split; i++)
      {
         try
         {
            System.out.print('^');
            Thread.sleep(interval);
         }
         catch (InterruptedException e)
         {
            e.printStackTrace();
         }
      }
   }

   protected void display(final String person, int index)
   {
      // System.out.println(index + ":" + person);
   }

   private final List<Long> initSleepPeriods()
   {
      final List<Long> periods = new LinkedList<Long>();
      for (int i = 0; i < count; i++)
      {
         final long func = (long) (i * i * i * i) / count;
         periods.add(Math.max(30l, func));
      }
      return Collections.unmodifiableList(periods);
   }

}
