package ukcodoctoruseful.cards;

public class Pot
{
   private double value;

   public void see(Player player, double bet)
   {
      player.see(bet);
      value += bet;
   }

   public void raise(Player player, double bet)
   {
      player.raise(bet);
      value += bet;

   }

   public String toString()
   {
      return "" + value;
   }


}
