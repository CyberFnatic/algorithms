'''
Title:          Merge sort
Description:    Algorithm for sorting integers in ascending order
Author:         Teemu Pätsi
Date:           11th of November 2018
Version:        1.0.1
Usage:          Import mergesort to python script --> mergesort(unsorted_array) 
Python version: 3.6

Change log:
    1.0.1       Added exception handler to ensure list only contains integers or floats
'''

import sys
import random
from datetime import datetime

def mergesort(array):
    
    # Exception handler to ensure list only contains integers or floats
    try:
        for element in array:
            if (not element == float(element)):
                raise ValueError
    except ValueError:
        print ("\nFunction mergesort only accepts lists consisting of integers or floats\nSorting was unsuccessful!\n")
    else:
        split(array)

# Splits array to sorted subarrays
def split(array):
    
    # 1 or 0 length array/substring is sorted
    if len(array) > 1:
        mid = len(array)//2
        left = array[:mid]
        right = array[mid:]
        
        # Recursively splits array until subarray reaches length of 1
        split(left)
        split(right)

        # Merges sorted subarrays
        merge(array, left, right)

# Merges sorted subarrays
def merge(array, left, right):
   
    i = j = k = 0
    
    # If both sides have still unsorted numbers
    while i < len(left) and j < len(right):

        # Change to descending sort by changing '<' to '>'
        if left[i] < right[j]:
            array[k] = left[i]
            i += 1
        else:
            array[k] = right[j]
            j += 1
        k += 1
    
    # If other subarray is empty, push rest of other side to the array due it's already sorted 
    while i < len(left):
        array[k] = left[i]
        i += 1
        k += 1
    while j < len(right):
        array[k] = right[j]
        j += 1
        k += 1
 
   # print ("Merge " + str(array))      # Delete comment to print when program merges two subarrays


# Checks that program prints elapsed time right (not -320ms but 780ms)
def time_check (start, stop):
    milliseconds = (stop.microsecond - start.microsecond) // 1000
    seconds = stop.second - start.second
    minutes = stop.minute - start.minute

    if milliseconds < 0:
        milliseconds += 1000
        seconds -= 1
    if seconds < 0:
        seconds += 60
        minutes -= 1 

    return minutes, seconds, milliseconds

def main():
    print("Executed main from mergesort.py")

if (__name__ == '__main__'):
    main()
