/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mycompany.question;

import java.util.Arrays;

/**
 *
 * @author User
 */
public class LIFOQUEUE implements IQueuable {

    private static int queueSize, stacksize, capacity = 10;
    private final String stringvalue[] = new String[capacity];

    public LIFOQUEUE() {
        stacksize = -1;
    }

    @Override
    public String enqueue(String value) {
        if (stacksize == capacity - 1) {
            System.out.println("Stack Overflow !!");
        } else {
            stacksize++;
            stringvalue[stacksize] = value;
        }
        return null;
    }

    @Override
    public String dequeue() {
        if (stacksize == -1) {
            System.out.println("Stack Underflow !!");
        } else {
            System.out.println("\nItem remove: " + stringvalue[stacksize--]);
        }

        return null;
    }

    @Override
    public void getQuene() {
        String finaldata = null;

        for (int i = stacksize; i >= 0; i--) {
                System.out.print(stringvalue[i] + " ");
        }
    }

    @Override
    public int size() {
        return queueSize;
    }

}
