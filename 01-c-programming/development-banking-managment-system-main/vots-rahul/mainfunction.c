#include<stdio.h>
#include<string.h>
#include <stdbool.h>
#include <stdlib.h>

int isdigit(int str);
int aito(int tasknumber);
int validateTaskNumber(int task);
void createAccount(long long int *account_no, char name[], int *balance);
void deposit(long long int account_no, int *balance);
void withdraw(long long int account_no, int *balance);
void checkBalance(long long int account_no, int balance);
void displayAccountDetails(long long int account_no, char name[], int balance);
int isNumeric(const char *str);
int main()
{   
    char taskInput[10];
    int task, exit = 1;
    int balance = 0;
    char name[20] = "";
    long long int account_no = 0;
 
    printf("\n\n**** Project-2: Banking Management System ****\n");
    printf("\n1 - Create account");
    printf("\n2 - Deposit");
    printf("\n3 - Withdraw");
    printf("\n4 - Check balance");
    printf("\n5 - Display account details");
    printf("\n0 - Exit\n");

    while (exit != 0)
    {
        printf("\nPlease enter the task number: ");
        scanf("%d", &taskInput);
         if (isNumeric(taskInput))
        {
            task = atoi(taskInput);
       
        if (validateTaskNumber(task))
        {
            switch (task)
            {
                case 1:
                     createAccount(&account_no, name, &balance);
                     break;
                case 2:
                     deposit(account_no, &balance);
                     break;
                case 3:
                     withdraw(account_no, &balance);
                     break;
                case 4:
                     checkBalance(account_no, balance);
                     break;
                case 5:
                     displayAccountDetails(account_no, name, balance);
                     break;
                case 0:
                     exit = 0;
                     break;
            }
        }
        else
        {
            printf("\nPlease enter a valid task number\n");
        }
    }
    else
    {
         printf("\nPlease enter a valid task number\n");
    }
    }
    printf("You have left\n");
    return 0;
}

int validateTaskNumber(int task)
{
    return (task >= 0 && task <= 5);
}

void createAccount(long long int *account_no, char name[], int *balance)
{
    printf("\nEnter your name: ");
    scanf("%s", name);
    printf("Enter account number: ");
    scanf("%lld", account_no);
    *balance = 0;  // Initialize balance to 0 for new account
    printf("Account created successfully.\n");
}

void deposit(long long int account_no, int *balance)
{
    int amount;
    printf("Enter amount to deposit: ");
    scanf("%d", &amount);
    *balance += amount;
    printf("Amount deposited successfully. New balance: %d\n", *balance);
}

void withdraw(long long int account_no, int *balance)
{
    int amount;
    printf("Enter amount to withdraw: ");
    scanf("%d", &amount);
    if (amount > *balance)
    {
        printf("Insufficient balance.\n");
    }
    else
    {
        *balance -= amount;
        printf("Amount withdrawn successfully. New balance: %d\n", *balance);
    }
}

void checkBalance(long long int account_no, int balance)
{
    printf("Account Number: %lld\n", account_no);
    printf("Current Balance: %d\n", balance);
}
int isNumeric(const char *str)
{
    for (int i = 0; str[i] != '\0'; i++)
    {
        if (!isdigit(str[i]))
        {
            return 0;
        }
    }
    return 1;
}
void displayAccountDetails(long long int account_no, char name[], int balance)
{
    printf("Account Number: %lld\n", account_no);
    printf("Account Holder: %s\n", name);
    printf("Current Balance: %d\n", balance);
}
