from math import sqrt

# Numbers given to function are 6k +- 1
def is_prime(num):
    
    if (num in prime_list):
        return True
    
    # Make list of primes that are smaller than sqrt(num)
    prime_list_min = [x for x in prime_list if x <= sqrt(num)] 
    
    # If sqrt(num) is smaller than biggest entry in prime_list
    # The smaller factor must already be in that list
    for prime_num in prime_list_min:
        if (num % prime_num == 0):
            return False
    
    return True

# How many times program asks for new input
how_many = int(input())
int_list = []

for x in range(0, how_many):
    two_ints = input()

    # Position of space between integers
    space = two_ints.find(' ')
    
    # Take two given integers to two variables
    int_list.append(int(two_ints[0:space]))
    int_list.append(int(two_ints[space+1:]))
    
# List for storing some already known primes
global prime_list
prime_list = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71]

# Loop through int_list, step = 2
for x in range(0, len(int_list), 2):
    
    # Generate prime_list further from 73 to sqrt of bigger given integer
    for number in range(1, round(sqrt(int_list[x+1])) + 1):
        if (number < 73):
            prime = False
        elif ( ((number + 1) % 6 == 0) or ((number - 1) % 6 == 0) ):
            prime = is_prime(number)
        else:
            prime = False
        
        # If number is prime, append it to prime_list
        if (prime):
            prime_list.append(number)
    
    # Loop through element x to x+1 in int_list and print primes
    for num in range(int_list[x], int_list[x+1]+1):
        
        if (num <= 1):
            prime = False
        elif (num == 2 or num == 3):
            prime = True
        elif ( ((num + 1) % 6 == 0) or ((num - 1) % 6 == 0) ):
            prime = is_prime(num)
        else:
            prime = False
        
        if (prime):
            print (num)

    
    # Newline if there is more test cases
    if (x != len(int_list)-2):
        print()
