package ukcodoctoruseful.cards;

public class PokerGame extends Game

{

   private double smallBlind;
   private double largeBlind = 2 * smallBlind;


   protected double getNextBetValue(long playId)
   {
      double nextBet = largeBlind;
      if (playId <= 0)
      {
         nextBet = smallBlind;
      }
      return nextBet;
   }


}
