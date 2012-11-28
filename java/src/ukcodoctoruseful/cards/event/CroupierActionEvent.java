package ukcodoctoruseful.cards.event;


public class CroupierActionEvent extends CardsEvent
{

   private final CroupierAction action;

   public CroupierActionEvent(CroupierAction action)
   {
      this.action = action;
   }

   /**
    * @return the action
    */
   public CroupierAction getAction()
   {
      return action;
   }

   public enum CroupierAction
   {
      CALL_SMALL_BLIND, CALL_BIG_BLIND, CALL_ANTE_UP, BEGIN_GAME, DEAL_FIRST_HAND, DEAL_ONE
   };

}
