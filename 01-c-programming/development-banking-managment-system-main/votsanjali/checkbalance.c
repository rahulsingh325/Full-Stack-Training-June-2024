#include <stdio.h>


void checkBalance(long long int account_no, int balance);

int main()
{
    long long int account_no;
    int balance = 5000; 

   
    printf("Enter your account number: ");
    scanf("%lld", &account_no);

    
    checkBalance(account_no, balance);

    return 0;
}


void checkBalance(long long int account_no, int balance)
{
    if (account_no > 10000000000 && account_no < 100000000000) {
        printf("Your account balance is: %d\n", balance);
    } else {
        printf("Sorry! Please create an account first....\n");
    }
}
