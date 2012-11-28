package ukcodoctoruseful.cards.event;

public class PlayerActionEvent
{

   public PlayerActionEvent(PlayerAction action, double amount) throws IllegalEventException
   {
      this.amount = amount;
      switch (action)
      {
         case ANTE:
         case CALL:
         case FOLD:
            break;
         case SEE:
         case RAISE:
            if (amount <= 0.01)
            {
               throw new IllegalEventException("amount required for action " + action);
            }
      }
   }

   public enum PlayerAction
   {
      ANTE, CALL, FOLD, SEE, RAISE
   };

   //amount only required for ante, see, raise.
   private double amount;

}
