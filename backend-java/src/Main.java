import java.util.*;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        // Show available time slots (open timings)
        List<String> allSlots = Arrays.asList("9AM", "10AM", "11AM", "1PM", "2PM", "3PM", "4PM");

        System.out.println("Available Time Slots:");
        for (int i = 0; i < allSlots.size(); i++) {
            System.out.println((i + 1) + ". " + allSlots.get(i));
        }

        System.out.print("Select time slot (enter number): ");
        int timeChoice = sc.nextInt();
        sc.nextLine();
        String time = allSlots.get(timeChoice - 1);

        // Number of people
        System.out.print("Enter number of people: ");
        int people = sc.nextInt();
        sc.nextLine();

        // Facilities menu
        System.out.println("\nSelect required facilities:");
        System.out.println("1. Projector");
        System.out.println("2. AC");
        System.out.println("3. Whiteboard");

        System.out.print("Enter choices (comma separated, e.g., 1,2): ");
        String input = sc.nextLine();

        List<String> facilities = new ArrayList<>();
        String[] choices = input.split(",");

        for (String choice : choices) {
            choice = choice.trim();
            switch (choice) {
                case "1":
                    facilities.add("Projector");
                    break;
                case "2":
                    facilities.add("AC");
                    break;
                case "3":
                    facilities.add("Whiteboard");
                    break;
            }
        }

        // Priority
        System.out.print("Enter priority (VIP/Normal): ");
        String priority = sc.nextLine();

        BookingRequest request = new BookingRequest(people, time, facilities, priority);

        List<Room> rooms = DataStore.getRooms();

        Room allocated = Allocator.allocateRoom(rooms, request);

        System.out.println("\n--- RESULT ---");

        if (allocated != null) {
            System.out.println("Allocated Room: " + allocated);
            System.out.println("Time Slot: " + time);
        } else {
            System.out.println("No suitable room available.");
        }
    }
}