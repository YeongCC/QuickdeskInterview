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
public class FIFOQUEUE implements IQueuable {

    private static int queueSize, capacity;
    private final String stringvalue[];

    public FIFOQUEUE() {
        capacity = 10;
        stringvalue = new String[capacity];
    }

    @Override
    public String enqueue(String value) {
        if (capacity == queueSize) {
            System.out.printf("\nQueue is full\n");
        } else {
            stringvalue[queueSize] = value;
            queueSize++;
        }
        System.out.println("adds " + value + " to queue");
        return null;
    }

    @Override
    public String dequeue() {
        for (int i = 0; i < queueSize - 1; i++) {
            stringvalue[i] = stringvalue[i + 1];
        }
        if (queueSize < capacity) {
            stringvalue[queueSize] = null;
        }
        queueSize--;
        System.out.println("removes item from queue");
        return null;
    }

    @Override
    public void getQuene() {
        String finaldata[];
        finaldata = new String[queueSize];
        for (int i = 0; i < queueSize; i++) {
            if (stringvalue[i] != null) {
                finaldata[i] = stringvalue[i];
            }
        }
        System.out.println(Arrays.toString(finaldata));
    }

    @Override
    public int size() {
        return queueSize;
    }

}
