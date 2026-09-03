#include <stdio.h>

int main()
 {
    
    char myArray[] = {'H', 'e', 'l', 'l', 'o', '\0'};


    for (int i = 0; myArray[i] != '\0'; i++)
     {
        printf("%c", myArray[i]);
     }

     return 0;


 }

