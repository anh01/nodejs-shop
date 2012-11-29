package ukcodoctoruseful.log;

import java.util.logging.Level;
import java.util.logging.Logger;


public final class LogAssistant
{
   private final Logger logger;
   private final String sourceName;

   public LogAssistant(Object o)
   {
      sourceName = o.toString();
      logger = initLog(o);
   }

   private final Logger initLog(final Object o)
   {
      return Logger.getLogger(sourceName);
   }

   /**
    * @param throwable
    */
   public void throwable(Throwable throwable)
   {
      logger.logp(Level.SEVERE, sourceName, null, throwable.toString(), throwable);
   }

   public void info(String message, Throwable throwable)
   {
      if (throwable == null)
      {
         logger.logp(Level.INFO, sourceName, null, message);
      }
      else
      {
         logger.logp(Level.INFO, sourceName, null, message, throwable);
      }
   }

   public void info(String message)
   {
      info(message, null);
   }

   public void logStart(String string)
   {
      info(string + ":start");
   }

   public void logEnd(String string)
   {
      info(string + ":end");
   }

}
