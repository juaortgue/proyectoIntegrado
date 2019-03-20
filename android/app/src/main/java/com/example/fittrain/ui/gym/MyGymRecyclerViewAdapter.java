package com.example.fittrain.ui.gym;

import android.content.Context;
import android.content.Intent;
import android.support.constraint.ConstraintLayout;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.example.fittrain.R;
import com.example.fittrain.model.GymResponse;


import java.util.List;

/**
 * TODO: Replace the implementation with code for your data type.
 */
public class MyGymRecyclerViewAdapter extends RecyclerView.Adapter<MyGymRecyclerViewAdapter.ViewHolder> {

    private final List<GymResponse> mValues;
    private Context ctx;
    private String jwt;

    public MyGymRecyclerViewAdapter(Context context, List<GymResponse> items) {
        mValues=items;
        ctx=context;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.fragment_gym, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, int position) {
        holder.mItem = mValues.get(position);

        if (holder.mItem.getPicture()!=null){
            Glide
                    .with(ctx)
                    .load(holder.mItem.getPicture())
                    .centerCrop()
                    .into(holder.imageViewCover);
        }else{
            Glide
                    .with(ctx)

                    .load("https://www.eecs.utk.edu/wp-content/uploads/2016/02/Symonds_EECS.jpg")
                    .centerCrop()
                    .into(holder.imageViewCover);
        }
        holder.textViewNamePrice.setText(holder.mItem.getName()+", "+holder.mItem.getPrice()+" €");
        holder.textViewAddress.setText(holder.mItem.getAddress());
        holder.gymConstraintLayaout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //IR A DETAIL DE GYM
                Intent iDetail = new Intent(ctx, GymDetailsActivity.class);
                iDetail.putExtra("id", holder.mItem.getId());
                ctx.startActivity(iDetail);
            }
        });


    }

    @Override
    public int getItemCount() {
        return mValues.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        public final View mView;
        public GymResponse mItem;
        public ImageView imageViewCover;
        public TextView textViewNamePrice, textViewAddress ;
        public ConstraintLayout gymConstraintLayaout;
        public ViewHolder(View view) {
            super(view);
            mView = view;
            imageViewCover = mView.findViewById(R.id.imageViewPictureGym);
            textViewAddress = mView.findViewById(R.id.textViewNamePriceGymDetail);
            textViewNamePrice = mView.findViewById(R.id.textViewTitleNamePriceGym);
            gymConstraintLayaout = mView.findViewById(R.id.constraintGym);
        }

        @Override
        public String toString() {
            return super.toString();
        }
    }
}
