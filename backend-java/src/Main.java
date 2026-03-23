import java.util.*;

public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.print("Enter number of people: ");
        int people = sc.nextInt();
        sc.nextLine();

        System.out.print("Enter time slot (e.g., 10AM): ");
        String time = sc.nextLine();

        System.out.print("Enter required facilities (comma separated): ");
        String input = sc.nextLine();
        List<String> facilities = Arrays.asList(input.split(","));

        System.out.print("Enter priority (VIP/Normal): ");
        String priority = sc.nextLine();

        BookingRequest request = new BookingRequest(people, time, facilities, priority);

        List<Room> rooms = DataStore.getRooms();

        Room allocated = Allocator.allocateRoom(rooms, request);

        System.out.println("\n--- RESULT ---");

        if (allocated != null) {
            System.out.println("Allocated Room: " + allocated);
        } else {
            System.out.println("No suitable room available.");
        }
    }
}