#include <stdio.h>

void displayAccountDetails(long long int account_no, char *name, int balance);
void createAccount(long long int *account_no, char *name, int *balance);

int main() 
{
    long long int account_no = 0;
    char name[100];
    int balance = 0;

    if (account_no == 0)
     {
        createAccount(&account_no, name, &balance);
    } 
    else
     {
        int press;
        printf("You already have an account\n");
        printf("Press--1 for a new account \nPress--2 for account information \nPress--0 to exit\n");
        printf("Press--");
        scanf("%d", &press);

        if (press == 1)
         {
            account_no = 0;
            createAccount(&account_no, name, &balance);
        }
         else if (press == 2)
          {
            displayAccountDetails(account_no, name, balance);
        }
         else if (press == 0)
          {
            printf("You are using the previous account\n");
        }
    }

    return 0;
}

void displayAccountDetails(long long int account_no, char *name, int balance)
 {
    printf("Account Number: %lld\n", account_no);
    printf("Account Holder Name: %s\n", name);
    printf("Account Balance: %d\n", balance);
}

void createAccount(long long int *account_no, char *name, int *balance
) {
    do 
    {
        printf("\nPlease enter 11 digit account number only: ");
        scanf("%lld", account_no);
    }
     while (*account_no <= 10000000000 || *account_no >= 100000000000);

    printf("Please enter your account holder name: ");
    scanf("%s", name);

    do
     {
        printf("Please enter balance (Opening account should be 500 minimum): ");
        scanf("%d", balance);
    }
     while (*balance < 500);

    printf("\n\n*Thank you for joining India Bank*\nYour account details:\n");
    displayAccountDetails(*account_no, name, *balance);
}
