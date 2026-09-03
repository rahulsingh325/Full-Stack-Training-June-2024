#include <stdio.h>


int isValidAccount(long long int account_no);
void withdraw(int *balance);

int main()
{
    long long int account_no;
    int balance = 5000; 

   
    printf("Enter your account number: ");
    scanf("%lld", &account_no);

    
    if (isValidAccount(account_no)) {
        printf("Your account balance is: %d\n", balance);
        
        withdraw(&balance);
        printf("Remaining balance: %d\n", balance);
    } else {
        printf("Sorry! Please create an account first....\n");
    }

    return 0;
}


int isValidAccount(long long int account_no)
{
    return (account_no > 10000000000 && account_no < 100000000000);
}


void withdraw(int *balance)
{
    int withdrawAmount;

    printf("Enter withdrawal amount: ");
    scanf("%d", &withdrawAmount);

    if (*balance >= withdrawAmount) {
        *balance -= withdrawAmount;
        printf("%d rupees debited from your bank account\n", withdrawAmount);
    } else {
        printf("Insufficient balance in your account\n");
    }
}
