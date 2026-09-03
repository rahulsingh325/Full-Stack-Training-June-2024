#include <stdio.h>

int main()
{
    //in this code i gave numbers value in starting 

    int sum,subtract,multiply,devid;

    int num1=9;
    int num2=8;

    sum =num1+num2;
    subtract =num1-num2;
    multiply =num1*num2;
    devid =num1/num2;

    printf("sum of num1+num2 :- %d + %d = %d\n",num1,num2,sum);
    printf("subtract of num1+num2 :- %d - %d = %d\n",num1,num2,subtract);
    printf("multiply of num1+num2 :- %d * %d = %d\n",num1,num2,multiply);
    printf("devid of num1+num2 :- %d / %d = %d\n",num1,num2,devid);


    return 0;
}